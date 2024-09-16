import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("StudentPortal", function () {

  async function deploySaveEther() {
  

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();
    

    const  StudentPortal = await hre.ethers.getContractFactory("StudentPortal");
    const studentPortal = await StudentPortal.deploy();

    return {studentPortal,owner, otherAccount};
  }
  //deployment
   describe("Deployment", function () {
    it("should set the correct owner", async function () {
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const {studentPortal} = await loadFixture(deploySaveEther);
    

      expect (await studentPortal.owner()).to.be.equal(owner);
    });

 
  });
   describe("registerStudents", function () {
    it("should revert on failing to correctly register students", async function () {
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const {studentPortal} = await loadFixture(deploySaveEther);


  const studentData = {
        name: "John Doe",
        email: "john@example.com",
        lga: "Sample LGA",
        dob: 946684800, 
        country: "Country",
        state: "State",
      };

      await studentPortal.connect(owner).registerStudents(
        studentData.name,
        studentData.email,
        studentData.lga,
        studentData.dob,
        studentData.country,
        studentData.state
      )


      const student = await studentPortal.getStudents(owner);

      expect (student.name).to.be.equal(studentData.name);
      expect (student.email).to.be.equal(studentData.email);
      expect (student.lga).to.be.equal(studentData.lga);
      expect (student.dob).to.be.equal(studentData.dob);
      expect (student.country).to.be.equal(studentData.country);
      expect (student.state).to.be.equal(studentData.state);
      expect(student.exist).to.be.equal(true)
    


    });

    it("should revert on registering the same student twice", async function () {
      const [owner, otherAccount] = await hre.ethers.getSigners();
      const {studentPortal} = await loadFixture(deploySaveEther);


  const studentData = {
        name: "John Doe",
        email: "john@example.com",
        lga: "Sample LGA",
        dob: 946684800,
        country: "Country",
        state: "State",
       
      };

      await studentPortal.connect(owner).registerStudents(
        studentData.name,
        studentData.email,
        studentData.lga,
        studentData.dob,
        studentData.country,
        studentData.state,
       )

       

       


       expect( await studentPortal.connect(owner).registerStudents(
        studentData.name,
        studentData.email,
        studentData.lga,
        studentData.dob,
        studentData.country,
        studentData.state
      )).to.be.revertedWithCustomError(studentPortal, "AlreadyAStudent")
    


    });



  });

  // //Another Function which is withdraw
  // describe("withdraw", function () {
  //   it("should revert on withdrawing more than balance", async function () {
  //     const [owner, otherAccount] = await hre.ethers.getSigners();
  //     const {saveEther} = await loadFixture(deploySaveEther);

      
  //     const depositAmount = ethers.parseEther("4");
    
   

  //    await  (saveEther.deposit({value: depositAmount}))
  //     const withdrawAmount = ethers.parseEther("6");
  //    await expect ( saveEther.withdraw(withdrawAmount)).to.be.revertedWithCustomError(saveEther,"InsufficientFunds");


  //   }); 
  //     it("should have the correct balance after withdraw", async function () {
  //     const [owner, otherAccount] = await hre.ethers.getSigners();
  //     const {saveEther} = await loadFixture(deploySaveEther);

      
  //     const depositAmount = ethers.parseEther("4");
    
   

  //    await  (saveEther.deposit({value: depositAmount}))
  //     const balBefore = await saveEther.getMyBalance();
  //   console.log(balBefore);
  //    const withdrawAmount = ethers.parseEther("2");

  //  expect(await saveEther.withdraw(withdrawAmount));
  //   const balAfter = await saveEther.getMyBalance();
    

  //     expect(await saveEther.getMyBalance()).to.be.equal(balAfter);
  //     expect(await saveEther.getContractBalance()).to.be.equal(balAfter)
   

  //     //await expect(saveEther.deposit({ value: ethers.parseEther("0") })).to.be.revertedWithCustomError(saveEther, "CantSendZero");
  //   });
  //   it("should emit correctly", async function () {
  //     const [owner, otherAccount] = await hre.ethers.getSigners();
  //     const {saveEther} = await loadFixture(deploySaveEther);

  //   const depositAmount = ethers.parseEther("4");
    
  //   await  (saveEther.deposit({value: depositAmount}))
      
  //     const withdrawAmount = ethers.parseEther("2");
    
  //    expect (await saveEther.withdraw(withdrawAmount)).to.emit(saveEther, "withdrawalSucessful").withArgs(owner,withdrawAmount)
      
   

  //     //await expect(saveEther.deposit({ value: ethers.parseEther("0") })).to.be.revertedWithCustomError(saveEther, "CantSendZero");
  //   });
  // });

  // //Transfer function
  // describe("transferFunds", function () {
  //   it("should revert on transfering more than balance", async function () {
  //     const [owner, otherAccount] = await hre.ethers.getSigners();
  //     const {saveEther} = await loadFixture(deploySaveEther);

      
  //     const depositAmount = ethers.parseEther("4");
    
   

  //    await  (saveEther.deposit({value: depositAmount}))
  //     const transferAmount = ethers.parseEther("8");
  //    await expect ( saveEther.transferFunds(otherAccount,transferAmount)).to.be.revertedWithCustomError(saveEther,"InsufientBalance");


  //   }); 
  //     it("should have the correct balance after transfer", async function () {
  //     const [owner, otherAccount] = await hre.ethers.getSigners();
  //     const {saveEther} = await loadFixture(deploySaveEther);
  //     //deposit first
  //     const depositAmount = ethers.parseEther("4");
  //     await  (saveEther.deposit({value: depositAmount}))
  //      const balBefore = await saveEther.getMyBalance();

  //     //transfer next
  //     const transferAmount = ethers.parseEther("4");
     
   

  //    await  (saveEther.transferFunds(otherAccount,transferAmount));
     
  //     const balAfter = await saveEther.getMyBalance();
    

  //     expect(await saveEther.getMyBalance()).to.be.equal(balAfter);
  //     expect(await saveEther.getContractBalance()).to.be.equal(balAfter)
   

  //     //await expect(saveEther.deposit({ value: ethers.parseEther("0") })).to.be.revertedWithCustomError(saveEther, "CantSendZero");
  //   });
  //   it("should emit transfer correctly", async function () {
  //     const [owner, otherAccount] = await hre.ethers.getSigners();
  //     const {saveEther} = await loadFixture(deploySaveEther);

  //   //deposit first
  //     const depositAmount = ethers.parseEther("4");
  //     await  (saveEther.deposit({value: depositAmount}))
  //      const balBefore = await saveEther.getMyBalance();

  //     //transfer next
  //     const transferAmount = ethers.parseEther("2");
     
   

  //    await  (saveEther.transferFunds(otherAccount,transferAmount));
     
  //     const balAfter = await saveEther.getMyBalance();
    
  //     expect (await saveEther.transferFunds(otherAccount,transferAmount)).to.emit(saveEther, "transferSuccessful").withArgs(otherAccount,transferAmount)
      
   

  //     //await expect(saveEther.deposit({ value: ethers.parseEther("0") })).to.be.revertedWithCustomError(saveEther, "CantSendZero");
  //   });
  // });



  });
