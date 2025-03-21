import bitcoin from "bitcoinjs-lib";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import * as ecc from "tiny-secp256k1";
import { BIP32Factory } from "bip32";

const bip32 = BIP32Factory(ecc);

export const generateBitcoinWallet = () => {
    const mnemonic = generateMnemonic();
    const seed = mnemonicToSeedSync(mnemonic);
    const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
    const keyPair = root.derivePath("m/44'/0'/0'/0/0");
    const { address } = bitcoin.payments.p2pkh({
        pubkey: Buffer.from(keyPair.publicKey),
        network: bitcoin.networks.bitcoin,
    });

    return { address, mnemonic };
};
