import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const SaveEtherModule = buildModule("SaveEtherModule", (m) => {
  

  const SaveEther = m.contract("SaveEther");

  return { SaveEther };
});

export default SaveEtherModule;

//SaveEtherModule#SaveEther - 0xD50E4845bd458972668Db96a98Df6455d34d54e8
