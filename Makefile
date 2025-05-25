#shortcuts for our commands including what is in out .env file
-include .env 

build:; forge build

deploy-sepolia:
forge script script/DeployFundMe.s.sol:DeployFundMe --rpc-url $(RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) --VVVV
#FOR FOUNDRY TO AUTOMATICALLY VERIFY CONTRACTS ON ETHERSCAN, YOU NEED TO SET UP YOUR ETHERSCAN_API_KEY IN YOUR .env FILE