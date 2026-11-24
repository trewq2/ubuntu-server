#!/usr/bin/env bash
set -euo pipefail

if [[ $EUID -ne 0 ]]; then
  echo "Futtasd root jogosultsággal: sudo bash $0"
  exit 1
fi

echo "=== Ubuntu Server 26.04.1 LTS RAW sablon előkészítése ==="
export DEBIAN_FRONTEND=noninteractive

apt update
apt -y full-upgrade
apt -y install sudo curl wget vim nano dnsutils iproute2 iputils-ping \
  net-tools procps ca-certificates unzip openssh-server

if id student >/dev/null 2>&1; then
  usermod -aG sudo student
else
  echo "FIGYELEM: student felhasználó nem található."
fi

systemctl enable --now ssh
hostnamectl set-hostname ubuntu-raw

# A tanulói labor ne legyen előre megoldva.
apt -y remove kea-dhcp4-server bind9 vsftpd apache2 nftables 2>/dev/null || true

# A második interfész statikus Netplan-konfigurációját a tanuló készíti el.
rm -f /etc/netplan/99-ubuntulab.yaml 2>/dev/null || true

apt clean
rm -rf /var/lib/apt/lists/*

history -c 2>/dev/null || true
rm -f /root/.bash_history
rm -f /home/student/.bash_history 2>/dev/null || true

echo
echo "RAW sablon előkészítve."
echo "Következő: sudo bash ubuntu26041_raw_check.sh"
