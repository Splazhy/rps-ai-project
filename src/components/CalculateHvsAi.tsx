import { createSignal } from "solid-js";

export default function calculateResult(playerChoice: string, computerChoice: number) {
  let result = 0;

  // กำหนดชื่อของภาพ
  const images = ['rock', 'paper', 'scissors'];
  const total = images[computerChoice]; // ใช้ computerChoice เพื่อรับค่าจาก images
  console.log('Computer Choice:', total);
  console.log('Player Choice:', playerChoice);
  
  // ฟังก์ชันคำนวณผลลัพธ์
  const calculateGameResult = () => {
    if (playerChoice === total) {
      result = 0; // เสมอ
    } else if (
      (playerChoice === 'rock' && total === 'scissors') ||
      (playerChoice === 'paper' && total === 'rock') ||
      (playerChoice === 'scissors' && total === 'paper')
    ) {
      result = 1; // ผู้เล่นชนะ
    } else {
      result = 2; // คอมพิวเตอร์ชนะ
    }
  };
  
  calculateGameResult();
  console.log('Result:', result);
  return result; // คืนค่าผลลัพธ์
}