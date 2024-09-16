import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const StudentPortalModule = buildModule("StudentPortalModule", (m) => {
 

  const StudentPortal = m.contract("StudentPortal" );

  return { StudentPortal };
});

export default StudentPortalModule;
//StudentPortalModule#StudentPortal - 0xB0c0f69E0994B73078Dac12daf5cD6A57Aa9a51e