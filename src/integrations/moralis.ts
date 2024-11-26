import { EvmChain } from "@moralisweb3/common-evm-utils";
import { Injectable } from "@nestjs/common";
import Moralis from "moralis";
import { CHAIN } from "src/enums/chain.enum";

const ADDRESS = {
    'ETH': '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    'POL': '0xcc42724c6683b7e57334c4e856f4c9965ed682bd'
}

@Injectable()
export default class MoralisApi {
    constructor() {
        Moralis.start({
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImExZGExMzRhLTU3MjQtNGZkMC1iNjdmLWU3MmI4MDllOWEwZiIsIm9yZ0lkIjoiNDE4MTUwIiwidXNlcklkIjoiNDMwMDE2IiwidHlwZUlkIjoiNjZhMTljYTQtMmJhOS00ZGYwLWFkYjQtNGNiOWUzYWU5NWZmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzI2MjA1OTQsImV4cCI6NDg4ODM4MDU5NH0.SC-c8g3a0Vz-sdXJuy_ooyWRFp3h4c5mxgwA0heQ52A",
        });
    }

    async getTokenPrice(chain: CHAIN) {
        const response = await Moralis.EvmApi.token.getTokenPrice({
            address: ADDRESS[chain],
            chain: EvmChain.BSC,
        });

        return response.result.usdPrice;
    }
}