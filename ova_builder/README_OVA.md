# Ubuntu Server 26.04.1 LTS RAW OVA – tanári elkészítési útmutató

## Alap ISO
Ajánlott: `ubuntu-26.04.1-live-server-amd64.iso`

## VirtualBox VM
Név: `Ubuntu26_04_1_RAW`
Típus: Linux / Ubuntu (64-bit)
RAM: 2048 MB
CPU: 2
Lemez: 20 GB dinamikus VDI

Hálózat:
- Adapter 1: NAT
- Adapter 2: Internal Network
- hálózat neve: UBUNTULAB
- Cable Connected: mindkettőn bekapcsolva

## Telepítő beállításai
Hostname: `ubuntu-raw`
Első felhasználó:
- név: Student
- username: `student`
- jelszó: a tanár által választott induló jelszó

Storage: teljes virtuális lemez használata megfelel.

SSH setup:
- Install OpenSSH server: BE

Featured server snaps:
- nem szükséges kijelölni semmit

## Első boot után
Másold a VM-re:
- `ubuntu26041_raw_prepare.sh`
- `ubuntu26041_raw_check.sh`

Majd:

```bash
sudo bash ubuntu26041_raw_prepare.sh
sudo bash ubuntu26041_raw_check.sh
```

## Mit készít elő a script?
- rendszerfrissítés;
- sudo és alap diagnosztikai eszközök;
- student bekerül a sudo csoportba;
- SSH engedélyezve;
- labor szolgáltatások ne legyenek előre megoldva;
- hostname: ubuntu-raw.

## Mit NEM készít elő?
A tanulónak kell megoldania:
- UBUNTULAB statikus IP Netplannel;
- Kea DHCP;
- BIND9;
- vsftpd;
- Apache2;
- nftables szabályok;
- anna/bela/vendeg/projekt;
- /srv/ftp jogosultságok.

## Leállítás

```bash
sudo poweroff
```

## OVA export Windows hoston

```cmd
VBoxManage export "Ubuntu26_04_1_RAW" --output "Ubuntu26_04_1_RAW.ova" --ovf20
```

A mellékelt `export_ova.bat` ugyanezt automatizálja.

## Próbaimport
A kész OVA-t mindig importáld vissza tesztként. Ellenőrizd:
- student belép;
- sudo működik;
- NAT működik;
- második adapter UBUNTULAB;
- nincs előre beállítva 192.168.60.1;
- Kea/BIND/vsftpd/Apache2 nincs előre megoldva.
