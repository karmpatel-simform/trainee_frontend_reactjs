terraform {
  required_providers {
    azurerm = {
      version = ">=3.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
  required_version = ">=1.0"

  backend "azurerm" {
    resource_group_name  = "IdentityGroup"
    storage_account_name = "identitystorage12"
    container_name       = "storage1"
    key                  = "terraform.tfstate"
    tenant_id            = "your_tenant_id"
    subscription_id      = "your_subscription_id"
  }
}

provider "azurerm" {
  features {}
}

provider "null" {

}



