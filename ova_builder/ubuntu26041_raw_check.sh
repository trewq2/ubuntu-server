#!/usr/bin/env bash
set -u

ok(){ printf "[OK]   %s\n" "$1"; }
bad(){ printf "[HIBA] %s\n" "$1"; }

echo "=== Ubuntu RAW sablon ellenőrzés ==="

grep -q '^ID=ubuntu' /etc/os-release && ok "Ubuntu rendszer" || bad "Nem Ubuntu"
grep -q 'VERSION_ID="26.04"' /etc/os-release && ok "Ubuntu 26.04 LTS" || bad "Nem Ubuntu 26.04"

id student >/dev/null 2>&1 && ok "student felhasználó létezik" || bad "student hiányzik"
id -nG student 2>/dev/null | grep -qw sudo && ok "student sudo csoporttag" || bad "student nem sudo csoporttag"

systemctl is-enabled --quiet ssh && ok "SSH engedélyezett" || bad "SSH nincs engedélyezve"
systemctl is-active --quiet ssh && ok "SSH fut" || bad "SSH nem fut"

for p in kea-dhcp4-server bind9 vsftpd apache2; do
  if dpkg-query -W -f='${Status}' "$p" 2>/dev/null | grep -q "install ok installed"; then
    bad "$p telepítve van – RAW sablonban ne legyen kész"
  else
    ok "$p nincs előre telepítve"
  fi
done

if [[ -e /etc/netplan/99-ubuntulab.yaml ]]; then
  bad "/etc/netplan/99-ubuntulab.yaml már létezik"
else
  ok "UBUNTULAB statikus Netplan-profil nincs előre elkészítve"
fi

echo
echo "Netplan fájlok:"
ls -l /etc/netplan || true
echo
echo "Hálózati interfészek:"
ip -br link
echo
echo "IP-címek:"
ip -br address
echo
echo "Útvonalak:"
ip route
