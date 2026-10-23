require('@nomicfoundation/hardhat-toolbox');
require('hardhat-contract-sizer');
require('hardhat-gas-reporter');
require('solidity-coverage')
require('hardhat-docgen');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();


function getEnvValue(k) {
    return process.env[k];
};

function infuraApi(name) {
    return `https://${name}.infura.io/v3/${getEnvValue('INFURA_API_KEY')}`;
};

function testnetKey() {
    return [getEnvValue('TESTNET_PRIVATE_KEY')];
};
function mainnetKey() {
    return [getEnvValue('MAINNET_PRIVATE_KEY')];
};

const configuredNetworks = [
    ['ethereum_sepolia', infuraApi('sepolia'), 11155111, testnetKey()],
    ['ethereum_goerli',  infuraApi('goerli'),  5,        testnetKey()],
    ['ethereum_mainnet', infuraApi('mainnet'), 1,        mainnetKey()],

    ['optimism_goerli',  infuraApi('goerli'),  5, testnetKey()],
    ['optimism_mainnet', infuraApi('mainnet'), 1, mainnetKey()],

    ['optimism_goerli',  infuraApi('optimism-goerli'),  420, testnetKey()],
    ['optimism_mainnet', infuraApi('optimism-mainnet'), 10,  mainnetKey()],

    ['arbitrum_goerli',  infuraApi('arbitrum-goerli'),  421613, testnetKey()],
    ['arbitrum_mainnet', infuraApi('arbitrum-mainnet'), 42161,  mainnetKey()],

    ['bsc_testnet', 'https://data-seed-prebsc-1-s1.binance.org:8545', 97, testnetKey()],
    ['bsc_mainnet', 'https://bsc-dataseed1.binance.org',              56, mainnetKey()],

    ['polygon_mumbai', infuraApi('polygon-mumbai'),  80001, testnetKey()],
    ['polygon_matic',  infuraApi('polygon-mainnet'), 137,   mainnetKey()],

    ['avalanche_fuji',    infuraApi('avalanche-fuji'),    43113, testnetKey()],
    ['avalanche_mainnet', infuraApi('avalanche-mainnet'), 43114, mainnetKey()],

    ['opera_testnet', 'https://rpc.testnet.fantom.network', 4002, testnetKey()],
    ['opera_mainnet', 'https://rpc.ankr.com/fantom',        250,  mainnetKey()],

    ['harmony_testnet', 'https://api.s0.b.hmny.io', 1666700000, testnetKey()],
    ['harmony_mainnet', 'https://api.s0.t.hmny.io', 1666600000, mainnetKey()],

    ['moonbasealpha_testnet', 'https://moonbase.unitedbloc.com',  1287, testnetKey()],
    ['moonbeam',              'https://moonbeam.unitedbloc.com',  1284, testnetKey()],
    ['moonriver',             'https://moonriver.unitedbloc.com', 1285, mainnetKey()],
];

const configuredEtherscanApiKeys = [
    ['mainnet', getEnvValue('ETHERSCAN_API_KEY')],
    ['goerli',  getEnvValue('ETHERSCAN_API_KEY')],
    ['sepolia', getEnvValue('ETHERSCAN_API_KEY')],

    ['optimisticEthereum', getEnvValue('OPTIMISTICSCAN_API_KEY')],
    ['optimisticGoerli',   getEnvValue('OPTIMISTICSCAN_API_KEY')],

    ['arbitrumOne',    getEnvValue('ARBISCAN_API_KEY')],
    ['arbitrumGoerli', getEnvValue('ARBISCAN_API_KEY')],

    ['bsc',        getEnvValue('BSCSCAN_API_KEY')],
    ['bscTestnet', getEnvValue('BSCSCAN_API_KEY')],

    ['polygon',       getEnvValue('POLYGONSCAN_API_KEY')],
    ['polygonMumbai', getEnvValue('POLYGONSCAN_API_KEY')],

    ['avalanche',            getEnvValue('SNOWTRACE_API_KEY')],
    ['avalancheFujiTestnet', getEnvValue('SNOWTRACE_API_KEY')],

    ['opera',      getEnvValue('FTMSCAN_API_KEY')],
    ['ftmTestnet', getEnvValue('FTMSCAN_API_KEY')],

    ['moonbeam',      getEnvValue('MOONSCAN_API_KEY')],
    ['moonbaseAlpha', getEnvValue('MOONSCAN_API_KEY')],
];


function getNetworks() {
    const networks = {
        development: {
            url: process.env.ETH_RPC_URL,
            accounts: [process.env.PRIVATE_KEY]
        },
    };

    configuredNetworks.forEach(tuple => {
        if (
            tuple[1] != null &&
            tuple[2] != null &&
            tuple[3] != null &&
            tuple[3][0] != null
        ) {
            networks[tuple[0]] = {
                url: tuple[1],
                chainId: tuple[2],
                accounts: tuple[3]
            };
        };
    });

    return networks;
};

function getEtherscanApiKeys() {
    const apiKeys = {};

    configuredEtherscanApiKeys.forEach(tuple => {
        if (tuple[1] != null) {
            apiKeys[tuple[0]] = tuple[1];
        };
    });

    return apiKeys;
};


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: '0.8.19',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },

    gasReporter: {
        enabled: (process.env.REPORT_GAS == '1') ? true : false
    },

    networks: getNetworks(),

    etherscan: {
        api_key: getEtherscanApiKeys()
    },
};
