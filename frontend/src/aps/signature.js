import crypto from "crypto";

/** Build APS SHA-256 signature: phrase + (sorted key=val) + phrase */
export function apsSign(params, phrase) {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([k, v]) =>
      v !== undefined && v !== null && v !== "" && k !== "signature"
    )
  );
  const ordered = Object.keys(clean).sort().map(k => `${k}=${clean[k]}`).join("");
  return crypto.createHash("sha256").update(`${phrase}${ordered}${phrase}`,"utf8")
    .digest("hex").toUpperCase();
}

export function apsVerifySignature(params, responsePhrase) {
  const sig = params.signature;
  if (!sig) return false;
  const calc = apsSign(params, responsePhrase);
  return sig.toUpperCase() === calc.toUpperCase();
}
