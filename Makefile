.PHONY: all build build-sizes \
test test-sizes \
coverage clean-coverage \
doc \
deploy-dev \
update-abis clean-abis \
clean distclean


CP=cp
RM=rm -f


SRC_DIR=contracts
OUT_DIR=artifacts/contracts
TEST_DIR=test
SCRIPTS_DIR=scripts
DEPLOYMENTS_DIR=deployments
ABI_OUTPUT_DIR_UI=frontend/src/contracts

ABIS=Token.json
ABIS_UI=$(patsubst %,$(ABI_OUTPUT_DIR_UI)/%,$(ABIS))
OUT_ABIS=$(ABIS_UI)

CONTRACT_ADDRESSES=contract-addresses.json
CONTRACT_ADDRESSES_UI=$(patsubst %,$(ABI_OUTPUT_DIR_UI)/%,$(CONTRACT_ADDRESSES))
OUT_CONTRACT_ADDRESSES=$(CONTRACT_ADDRESSES_UI)


$(ABI_OUTPUT_DIR_UI)/%.json: $(SRC_DIR)/%.sol
	$(CP) $(OUT_DIR)/$(basename $(notdir $<)).sol/$(basename $(notdir $<)).json $@


all: build update-abis

build:
	npx hardhat compile

build-sizes:
	npx hardhat size-contracts

coverage:
	npx hardhat coverage

clean-coverage:
	$(RM) ./coverage.json
	$(RM) -r coverage

test:
	REPORT_GAS=0 npx hardhat test

test-sizes:
	REPORT_GAS=1 npx hardhat test

doc:
	npx hardhat docgen

deploy-dev:
	npx hardhat run $(SCRIPTS_DIR)/deploy.js --network development
	$(CP) $(DEPLOYMENTS_DIR)/$(CONTRACT_ADDRESSES) $(ABI_OUTPUT_DIR_UI)/$(CONTRACT_ADDRESSES)

update-abis: build $(OUT_ABIS)

clean-abis:
	$(RM) $(OUT_ABIS)

clean:
	npx hardhat clean

distclean: clean clean-coverage clean-abis
