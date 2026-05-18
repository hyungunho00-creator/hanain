# -*- coding: utf-8 -*-
import json, time, urllib.request, urllib.parse
BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"
UA = {"User-Agent": "phlorotannin-research/1.0 (contact@phlorotannin.com)"}

QUERIES = {
    "1_alzheimer_bace1": "phlorotannin AND (BACE1 OR acetylcholinesterase OR Alzheimer)",
    "2_covid_3clpro": "phlorotannin AND (SARS-CoV-2 OR 3CLpro OR antiviral OR spike)",
    "3_melanoma_apoptosis": "phlorotannin AND (melanoma OR tyrosinase OR apoptosis)",
    "4_ace_blood_pressure": "phlorotannin AND (ACE inhibitor OR angiotensin OR blood pressure)",
    "5_nrf2_antioxidant": "phlorotannin AND (Nrf2 OR Keap1 OR HO-1)",
    "6_nfkb_inflammation": "phlorotannin AND (NF-kB OR TNF OR iNOS OR inflammation)",
    "7_uvb_photoaging": "phlorotannin AND (UVB OR MMP-1 OR photoaging OR collagen)",
    "8_gut_microbiome": "phlorotannin AND (gut OR microbiome OR colitis OR TLR4)",
    "9_pcsk9_cholesterol": "phlorotannin AND (cholesterol OR PCSK9 OR SREBP OR HMG-CoA OR lipid)",
    "10_drug_development": "ecklonia cava AND (clinical OR drug OR pharmacokinetic)",
}

def fetch_json(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        body = r.read().decode("utf-8")
        return json.loads(body)

def search(term, retmax=6):
    q = urllib.parse.urlencode({"db":"pubmed","term":term,"retmode":"json","retmax":str(retmax),"sort":"relevance"})
    return fetch_json(f"{BASE}/esearch.fcgi?{q}")

def summary(pmids):
    if not pmids: return {}
    q = urllib.parse.urlencode({"db":"pubmed","id":",".join(pmids),"retmode":"json"})
    return fetch_json(f"{BASE}/esummary.fcgi?{q}")

results = {}
for key, term in QUERIES.items():
    try:
        s = search(term, retmax=6)
        pmids = s.get("esearchresult", {}).get("idlist", [])
        info = []
        if pmids:
            time.sleep(0.5)
            summ = summary(pmids)
            for pmid in pmids:
                it = summ.get("result", {}).get(pmid, {})
                if not it: continue
                auths = it.get("authors", [])
                info.append({
                    "pmid": pmid,
                    "title": it.get("title",""),
                    "journal": it.get("source",""),
                    "year": (it.get("pubdate","") or "")[:4],
                    "first_author": auths[0]["name"] if auths else "",
                    "doi": next((x["value"] for x in it.get("articleids",[]) if x.get("idtype")=="doi"), ""),
                })
        results[key] = info
        print(f"[{key}] {len(info)} papers", flush=True)
    except Exception as e:
        print(f"[{key}] ERROR: {e}", flush=True)
        results[key] = []
    time.sleep(0.5)

with open("tmp_seo_assets/research_batch/pubmed_results.json","w",encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("DONE")
