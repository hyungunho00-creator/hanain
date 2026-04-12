import os, json, hashlib, requests, time, mimetypes

VERCEL_TOKEN = "vcp_1hzc1Bc2fZRGwLftWiq6wyh3BKH7WOoKFcNYakVvp7UUs4KZ4T1ilrk7"
TEAM_ID = "team_ZrgDT3bXQCqVrblRy6NkjDtL"
HEADERS = {"Authorization": f"Bearer {VERCEL_TOKEN}"}
DIST = "dist"

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

# Create deployment — routes로 SPA 라우팅 처리 (404 방지)
payload = {
    "name": "hanain",
    "files": files_payload,
    "projectSettings": {"framework": None, "buildCommand": "", "installCommand": "", "outputDirectory": ""},
    "target": "production",
    "public": True,
    "routes": [
        # 정적 파일 직접 서빙
        {"src": "^/assets/(.*)$",    "dest": "/assets/$1"},
        {"src": "^/favicon\\.svg$",  "dest": "/favicon.svg"},
        {"src": "^/og-image\\.png$", "dest": "/og-image.png"},
        {"src": "^/og-image\\.svg$", "dest": "/og-image.svg"},
        {"src": "^/robots\\.txt$",   "dest": "/robots.txt"},
        {"src": "^/sitemap\\.xml$",  "dest": "/sitemap.xml"},
        {"src": "^/qa\\.json$",      "dest": "/qa.json"},
        {"src": "^/partners\\.json$","dest": "/partners.json"},
        {"src": "^/icons\\.svg$",    "dest": "/icons.svg"},
        {"src": "^/naver[^/]*\\.html$", "dest": "/naver21cd8f3c98868563556535b34a1b04d6.html"},
        # 나머지 모든 경로 → index.html (React SPA 라우팅)
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

deploy_id = data["id"]
deploy_url = data.get("url", "")
print(f"Deploy ID: {deploy_id}")
print(f"Deploy URL: https://{deploy_url}")

# Poll for READY
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

# Add aliases
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
