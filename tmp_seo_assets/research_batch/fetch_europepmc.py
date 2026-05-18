# -*- coding: utf-8 -*-
import json, time, urllib.request, urllib.parse

BASE = "https://www.ebi.ac.uk/europepmc/webservices/rest/search"

QUERIES = {
    "1_alzheimer_bace1": "phlorotannin AND (BACE1 OR acetylcholinesterase OR Alzheimer)",
    "2_covid_3clpro": "phlorotannin AND (SARS-CoV-2 OR 3CLpro OR antiviral)",
    "3_melanoma_apoptosis": "phlorotannin AND (melanoma OR tyrosinase OR apoptosis)",
    "4_ace_blood_pressure": "phlorotannin AND (ACE OR angiotensin OR blood pressure)",
    "5_nrf2_antioxidant": "phlorotannin AND (Nrf2 OR Keap1 OR HO-1)",
    "6_nfkb_inflammation": "phlorotannin AND (NF-kB OR TNF OR iNOS)",
    "7_uvb_photoaging": "phlorotannin AND (UVB OR MMP OR photoaging OR collagen)",
    "8_gut_microbiome": "phlorotannin AND (gut OR microbiome OR colitis OR TLR4)",
    "9_pcsk9_cholesterol": "phlorotannin AND (cholesterol OR SREBP OR HMG-CoA OR lipid)",
    "10_drug_development": "ecklonia cava AND (clinical OR drug OR pharmacokinetic)",
}

def search(term, page_size=6):
    q = urllib.parse.urlencode({
        "query": term, "format": "json", "pageSize": str(page_size),
        "resultType": "lite", 
    })
    url = f"{BASE}?{q}"
    with urllib.request.urlopen(url, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))

results = {}
for key, term in QUERIES.items():
    try:
        s = search(term, page_size=6)
        hits = s.get("resultList", {}).get("result", [])
        info = []
        for it in hits:
            info.append({
                "pmid": it.get("pmid",""),
                "pmcid": it.get("pmcid",""),
                "doi": it.get("doi",""),
                "title": it.get("title","").rstrip("."),
                "journal": it.get("journalTitle",""),
                "year": it.get("pubYear",""),
                "first_author": (it.get("authorString","") or "").split(",")[0].strip(),
            })
        results[key] = info
        print(f"[{key}] {len(info)} papers", flush=True)
    except Exception as e:
        print(f"[{key}] ERROR: {e}", flush=True)
        results[key] = []
    time.sleep(0.3)

with open("tmp_seo_assets/research_batch/papers.json","w",encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("DONE")
