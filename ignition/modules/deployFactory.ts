
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MultiSigFactory = buildModule("MultiSigFactoryModule", (m) => {

    const factory = m.contract("MultiSigFactory", []);

    return { factory };
});

export default MultiSigFactory;
