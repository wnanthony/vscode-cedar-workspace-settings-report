const safe = (value) => String(value).replaceAll("|","\\|").replace(/[\r\n]+/g," ");
export function createReport(settings, inspections = {}) {
  const keys = Object.keys(settings).sort();
  const warnings=[];
  for(const key of keys){const value=settings[key]; if(/(path|directory|executable)/i.test(key)&&typeof value==="string"&&(/^[A-Za-z]:\\|^\//.test(value))) warnings.push(`${key} uses an absolute path.`); if(/token|password|secret|api.?key/i.test(key)) warnings.push(`${key} may contain sensitive material and its value was redacted.`);}
  const rows=keys.map((key)=>{const secret=/token|password|secret|api.?key/i.test(key); const info=inspections[key]??{}; return `| ${safe(key)} | ${secret?"[redacted]":safe(JSON.stringify(settings[key]))} | ${safe(JSON.stringify(info.workspaceValue??"—"))} | ${safe(JSON.stringify(info.globalValue??"—"))} |`;});
  return `# Workspace settings report\n\nGenerated read-only audit. Review before sharing.\n\n## Summary\n\n- Workspace settings: ${keys.length}\n- Portability/security warnings: ${warnings.length}\n\n## Settings\n\n| Setting | Effective/workspace file | Workspace scope | User scope |\n|---|---|---|---|\n${rows.join("\n")}\n\n## Warnings\n\n${warnings.length?warnings.map(w=>`- ${w}`).join("\n"):"- No obvious portability or secret-name warnings detected."}\n`;
}
