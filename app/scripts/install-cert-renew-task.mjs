import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const userHome = process.env.USERPROFILE ?? process.env.HOME;
const taskName = 'AqztjxCertRenew';
const logDir = path.join(userHome, '.aqztjx');
const logPath = path.join(logDir, 'cert-renew.log');
const scriptPath = path.join(logDir, 'install-cert-renew-task.ps1');
const runnerPath = path.join(logDir, 'run-cert-renew.ps1');

await mkdir(logDir, { recursive: true });

const runner = `Set-Location "${appDir}"
& "D:\\soft\\npm.cmd" run cert:renew *>> "${logPath}"
`;

const powershell = `$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument '-NoProfile -ExecutionPolicy Bypass -File "${runnerPath}"' -WorkingDirectory "${appDir}"
$Trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 09:15
$Settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 1) -MultipleInstances IgnoreNew
Register-ScheduledTask -TaskName "${taskName}" -Action $Action -Trigger $Trigger -Settings $Settings -Description "Renew aqztjx.top Alibaba Cloud free HTTPS certificate when it is near expiry." -Force
`;

await writeFile(runnerPath, runner, 'utf8');
await writeFile(scriptPath, powershell, 'utf8');

console.log(`Wrote task runner: ${runnerPath}`);
console.log(`Wrote task installer: ${scriptPath}`);
console.log(`Task name: ${taskName}`);
console.log(`Log file: ${logPath}`);
console.log('Run this in an elevated PowerShell if Register-ScheduledTask requires permission:');
console.log(`powershell -ExecutionPolicy Bypass -File "${scriptPath}"`);
