# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "hashicorp/precise32"
  config.vm.provision :shell, :path => "provision.sh"

  config.vm.network :forwarded_port, host: 3080, guest: 80
  config.vm.network :forwarded_port, host: 3001, guest: 3000
  config.vm.network :forwarded_port, host: 27018, guest: 27017
  config.vm.network "private_network", ip: "192.168.10.10"

  config.vm.provider "virtualbox" do |vb|
  #  vb.gui = true
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end
end
