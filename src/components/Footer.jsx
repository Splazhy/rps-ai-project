export default function Footer() {
  const groupMembers =
`จัดทำโดย
65050075 กิตติพิชญ์ มุกดาสนิท
65050192 ชลภณ นิลพันธุ์
65050251 ณัชพล สลาเวศม์
65050346 ทัศน์พล แดงอร่าม
65050365 ธนภัทร แคะมะดัน
65050410 ธีณภัทร คล้ำคล้าย
65050415 ธีรทัศน์ เที่ยงธรรม
`;

  return (
    <footer class="footer footer-center mt-auto font-sans bg-base-300 text-base-content p-4">
      <aside>
        <p>
          โปรเจกต์วิชา 05506210 ARTIFICIAL INTELLIGENCE ของ&nbsp;
          <span class="tooltip before:whitespace-pre-wrap before:content-[attr(data-tip)]" data-tip={groupMembers}>
            <span class='text-indigo-500 underline font-bold'>กลุ่ม ReLU</span>
          </span>
          &nbsp;ปีการศึกษา 2567
        </p>
      </aside>
    </footer>
  );
}