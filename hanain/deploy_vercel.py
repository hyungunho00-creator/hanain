"""
Vercel 배포 스크립트 — 배포 전 sitemap/RSS 자동 재생성 포함
실행: VERCEL_TOKEN=... python3 deploy_vercel.py
"""
import os, json, hashlib, requests, time, mimetypes, subprocess, sys

VERCEL_TOKEN = os.environ.get("VERCEL_TOKEN", "")
TEAM_ID = "team_ZrgDT3bXQCqVrblRy6NkjDtL"
HEADERS = {"Authorization": f"Bearer {VERCEL_TOKEN}"}
DIST = "dist"

# ── Step 1: sitemap.xml + rss.xml 재생성 ────────────────────
print("🗺  sitemap.xml / rss.xml 재생성 중...")
ret = subprocess.run([sys.executable, "generate_sitemap_rss.py"], capture_output=True, text=True)
if ret.returncode != 0:
    print("  ⚠ sitemap 생성 오류 (계속 진행):", ret.stderr[:200])
else:
    print(ret.stdout.strip())

# public/ → dist/ 복사 (sitemap.xml, rss.xml 동기화)
import shutil
for fname in ["sitemap.xml", "rss.xml"]:
    src = os.path.join("public", fname)
    dst = os.path.join(DIST, fname)
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"  ✅ {fname} → dist/ 복사 완료")

print()

# ── Step 2: 파일 업로드 ──────────────────────────────────────
def sha1(data):
    return hashlib.sha1(data).hexdigest()

def upload_file(path):
    with open(path, "rb") as f:
        data = f.read()
    digest = sha1(data)
    mt = mimetypes.guess_type(path)[0] or "application/octet-stream"
    r = requests.post(
        f"https://api.vercel.com/v2/files?teamId={TEAM_ID}",
        headers={**HEADERS, "Content-Type": mt, "x-vercel-digest": digest},
        data=data
    )
    if r.status_code not in (200, 201, 409):
        print(f"  UPLOAD FAIL {path}: {r.status_code} {r.text[:200]}")
    return digest, len(data)

files_payload = []
for root, dirs, files in os.walk(DIST):
    dirs.sort()
    for fname in sorted(files):
        fpath = os.path.join(root, fname)
        rel = fpath[len(DIST)+1:]
        print(f"  uploading {rel}...")
        digest, size = upload_file(fpath)
        files_payload.append({"file": rel, "sha": digest, "size": size})

print(f"\nTotal files: {len(files_payload)}")

# ── Step 3: Vercel 배포 ──────────────────────────────────────
payload = {
    "name": "hanain",
    "files": files_payload,
    "projectSettings": {"framework": None, "buildCommand": "", "installCommand": "", "outputDirectory": ""},
    "target": "production",
    "public": True,
    "routes": [
        {"src": "^/assets/(.*)$",    "dest": "/assets/$1"},
        {"src": "^/favicon\\.svg$",  "dest": "/favicon.svg"},
        {"src": "^/og-image\\.png$", "dest": "/og-image.png"},
        {"src": "^/og-image\\.svg$", "dest": "/og-image.svg"},
        {"src": "^/robots\\.txt$",   "dest": "/robots.txt"},
        {"src": "^/sitemap\\.xml$",  "dest": "/sitemap.xml"},
        {"src": "^/rss\\.xml$",      "dest": "/rss.xml"},
        {"src": "^/qa\\.json$",      "dest": "/qa.json"},
        {"src": "^/partners\\.json$","dest": "/partners.json"},
        {"src": "^/icons\\.svg$",    "dest": "/icons.svg"},
        {"src": "^/naver[^/]*\\.html$", "dest": "/naver21cd8f3c98868563556535b34a1b04d6.html"},
        {"src": "^/(.*)$",           "dest": "/index.html"},
    ],
}
r = requests.post(
    f"https://api.vercel.com/v13/deployments?teamId={TEAM_ID}",
    headers={**HEADERS, "Content-Type": "application/json"},
    json=payload
)
data = r.json()
if not r.ok:
    print("DEPLOY FAIL:", json.dumps(data)[:400])
    exit(1)

deploy_id  = data["id"]
deploy_url = data.get("url", "")
print(f"Deploy ID: {deploy_id}")
print(f"Deploy URL: https://{deploy_url}")

# ── Step 4: READY 대기 ───────────────────────────────────────
print("Waiting for READY status...")
for i in range(40):
    time.sleep(3)
    sr = requests.get(f"https://api.vercel.com/v13/deployments/{deploy_id}?teamId={TEAM_ID}", headers=HEADERS)
    sd = sr.json()
    status = sd.get("status") or sd.get("readyState", "")
    print(f"  [{i*3}s] status: {status}")
    if status == "READY":
        print("✅ READY!")
        break
    if status == "ERROR":
        print("❌ ERROR:", sd.get("errorMessage"))
        break

# ── Step 5: 도메인 alias 연결 ────────────────────────────────
for alias in ["phlorotannin.com", "www.phlorotannin.com"]:
    ar = requests.post(
        f"https://api.vercel.com/v2/deployments/{deploy_id}/aliases?teamId={TEAM_ID}",
        headers={**HEADERS, "Content-Type": "application/json"},
        json={"alias": alias}
    )
    ad = ar.json()
    if ar.ok:
        print(f"✅ Alias {alias} linked")
    else:
        print(f"⚠️  Alias {alias}: {ad.get('error', {}).get('message', ar.text[:100])}")

print("\nDone! Live at https://phlorotannin.com")
