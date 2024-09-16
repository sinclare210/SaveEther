import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";


describe("SaveEther", function () {

  async function deploySaveEther() {
  

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();
    

    const  SaveEther = await hre.ethers.getContractFactory("SaveEther");
    const saveEther = await SaveEther.deploy();

    return {saveEther,owner, otherAccount};
  }
   describe("Deployment", function () {
    it("should set the correct owner", async function () {
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const {saveEther} = await loadFixture(deploySaveEther);
    

      expect (await saveEther.owner()).to.be.equal(owner);
    });

 
  });
   describe("Deposit", function () {
    it("should revert on zero sending", async function () {
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const {saveEther} = await loadFixture(deploySaveEther);

      const depositAmount = ethers.parseEther("0")
    

     await expect ( saveEther.deposit({value: ethers.parseEther("0")})).to.be.revertedWithCustomError(saveEther,"CantSendZero");
      //await expect(saveEther.deposit({ value: ethers.parseEther("0") })).to.be.revertedWithCustomError(saveEther, "CantSendZero");

    }); 
      it("should have the correct balance after depposit", async function () {
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const {saveEther} = await loadFixture(deploySaveEther);

      
      const depositAmount = ethers.parseEther("4");
    
    const balBefore = await saveEther.getMyBalance();
    console.log(balBefore);

     await  (saveEther.deposit({value: depositAmount}))

      expect(await saveEther.getMyBalance()).to.be.equal(depositAmount + balBefore);
      expect(await saveEther.getContractBalance()).to.be.equal(depositAmount + balBefore)
   

      //await expect(saveEther.deposit({ value: ethers.parseEther("0") })).to.be.revertedWithCustomError(saveEther, "CantSendZero");
    });
    it("should emit correctly", async function () {
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const {saveEther} = await loadFixture(deploySaveEther);

      
      const depositAmount = ethers.parseEther("4");
    
     expect (await saveEther.deposit({value: depositAmount})).to.emit(saveEther, "DepositSuccesful").withArgs(owner,depositAmount)
      
   

      //await expect(saveEther.deposit({ value: ethers.parseEther("0") })).to.be.revertedWithCustomError(saveEther, "CantSendZero");
    });
  });

  //Another Function
  describe("withdraw", function () {
    it("should revert on sending more than balance", async function () {
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const {saveEther} = await loadFixture(deploySaveEther);

      
      const depositAmount = ethers.parseEther("4");
    
   

     await  (saveEther.deposit({value: depositAmount}))
      const withdrawAmount = ethers.parseEther("6");
     await expect ( saveEther.withdraw(withdrawAmount)).to.be.revertedWithCustomError(saveEther,"InsufficientFunds");


    }); 
      it("should have the correct balance after withdraw", async function () {
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const {saveEther} = await loadFixture(deploySaveEther);

      
      const depositAmount = ethers.parseEther("4");
    
   

     await  (saveEther.deposit({value: depositAmount}))
      const balBefore = await saveEther.getMyBalance();
    console.log(balBefore);
     const withdrawAmount = ethers.parseEther("2");

   expect(await saveEther.withdraw(withdrawAmount));
    const balAfter = await saveEther.getMyBalance();
    

      expect(await saveEther.getMyBalance()).to.be.equal(balAfter);
      expect(await saveEther.getContractBalance()).to.be.equal(balAfter)
   

      //await expect(saveEther.deposit({ value: ethers.parseEther("0") })).to.be.revertedWithCustomError(saveEther, "CantSendZero");
    });
    it("should emit correctly", async function () {
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const {saveEther} = await loadFixture(deploySaveEther);

    const depositAmount = ethers.parseEther("4");
    
    await  (saveEther.deposit({value: depositAmount}))
      
      const withdrawAmount = ethers.parseEther("2");
    
     expect (await saveEther.withdraw(withdrawAmount)).to.emit(saveEther, "withdrawalSucessful").withArgs(owner,withdrawAmount)
      
   

      //await expect(saveEther.deposit({ value: ethers.parseEther("0") })).to.be.revertedWithCustomError(saveEther, "CantSendZero");
    });
  });


  });
