# Release 1.0.0

Evidence: deterministic redaction/portability tests and syntax checks pass; `vsce` produces a seven-file VSIX; the VSIX installs successfully into local VS Code as `cedarmeridian.cedar-workspace-settings-report@1.0.0`. Artifact: `artifacts/releases/cedar-workspace-settings-report-1.0.0.vsix`.

Owner publishing gate: create the public repository named in `package.json`, push this directory, create or confirm the `cedarmeridian` Marketplace publisher, obtain a scoped token, manually exercise representative settings files, capture screenshots, then publish the tested VSIX with current `vsce`.
