import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const bankFactory = buildModule("BankFactoryModule", (m) =>{
    const factory = m.contract("BankFactory");

    return { factory };
});

export default bankFactory;