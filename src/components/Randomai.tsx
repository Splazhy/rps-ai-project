import { createSignal } from 'solid-js';

function RandomImage() {
  // สร้าง signal สำหรับเก็บ URL ของภาพ
  const [imgSrc, setImgSrc] = createSignal('');

  // ฟังก์ชันสุ่มเลือกรูปภาพ
  const getRandomImage = () => {
    const images = [
      'src/assets/rock.png',
      'src/assets/paper.png',
      'src/assets/scissors.png'
    ];
    
    const randomIndex = Math.floor(Math.random() * images.length);
    setImgSrc(images[randomIndex]); // อัปเดตค่า imgSrc
  };

  // เรียกใช้ฟังก์ชันเพื่อสุ่มภาพเมื่อคอมโพเนนต์ถูกสร้างขึ้น
  getRandomImage();

  return (
    <div class='flex gap-4'>
      <img src={imgSrc()} class='size-48 ' />
    </div>
  );
}

export default RandomImage;
