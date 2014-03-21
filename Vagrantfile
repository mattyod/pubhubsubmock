Vagrant.configure("2") do |config|

  #provider blocks
  config.vm.provider :virtualbox do |config, override|
    override.vm.box = "opscode-ubuntu-12.04"
    override.vm.box_url = "https://opscode-vm.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04_provisionerless.box"
    override.vm.network :forwarded_port, host: 9100, guest: 9100
    config.customize ["modifyvm", :id, "--memory", 512]
  end

  config.vm.provider "aws" do |aws, override|
    override.vm.box = "dummy"
    override.vm.box_url = "https://github.com/mitchellh/vagrant-aws/raw/master/dummy.box"
    aws.access_key_id = ENV['AWS_ACCESS_KEY']
    aws.secret_access_key = ENV['AWS_SECRET_KEY']

    aws.keypair_name = ""
    aws.ami = "ami-66ef0111"
    aws.region = "eu-west-1"
    aws.security_groups = [ "NIAccess" ]

    aws.tags = {
      "Name" => "",
      "ServiceName" => "",
      "ServiceOwner" => "",
      "CostCentre" => ""
    }

    override.ssh.username = "ubuntu"
    override.ssh.private_key_path = ""
  end

  #configure chef installation and cookbooks
  config.berkshelf.enabled = true
  config.omnibus.chef_version = :latest

  #configure chef solo
  config.vm.provision :chef_solo do |chef|
    chef.log_level = :info
    chef.json = {
      "nodejs" => { "version" => "0.10.26" }
    }
    chef.run_list = [
      "recipe[nodejs]"
    ]
  end

  config.vm.synced_folder ".", "/vagrant"
end
