import TelegramLogo from "/svgs/footer_telegram-logo.svg";
import FacebookLogo from "/svgs/footer_facebook-logo.svg";
import LinkedinLogo from "/svgs/footer_linkedin-logo.svg";
import FooterLogo from "/svgs/footer_logo.svg";
import { useLocation } from 'react-router-dom'

type SocialLink = {
  icon: string;
  alt: string;
  url: string;
};

function Footer() {
    const { pathname } = useLocation();

  const currentLan = pathname.includes("/en") ? "en" : "ru";
  const socialLinks: SocialLink[] = [
    {
      icon: TelegramLogo,
      alt: "Telegram",
      url: "https://t.me/akfamedline", 
    },
    {
      icon: FacebookLogo,
      alt: "Facebook",
      url: "https://www.facebook.com/akfamedline",
    },
    {
      icon: LinkedinLogo,
      alt: "LinkedIn",
      url: "https://www.linkedin.com/company/akfamedline",
    },
  ];

  return (
    <footer className="w-screen p-[42px] pl-[80px] pr-[80px] bg-black max-2xl:p-[20px] max-md:p-[44px] max-md:pl-[16px] max-md:pr-[16px]">
      <div className="w-[1296px] max-w-[1296px] gap-[24px] flex flex-col m-auto max-2xl:w-full">
        <div className="w-full flex justify-between text-white max-2xl:w-full max-md:flex-col max-md:gap-[64px]">
          <div className="flex flex-col w-[375.83px] gap-[32px] max-md:w-full">
            <div className="flex flex-col gap-[23.1px] ">
              <img
                src={FooterLogo}
                className="w-[100px] h-[50.1px]"
                alt="Akfa Medline"
              />
              <p className="h-[55px] font-[400] text-[16px] leading-[27.2px]">
                Phone: <a href="tel:+998774033003">+998-77-403-30-03</a> <br />
                Email:{" "}
                <a href="mailto:hr.pm@akfamedline.uz" className="text-white no-underline">hr.pm@akfamedline.uz</a>
              </p>
            </div>

            <div className="flex gap-[16px]">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[36px] h-[36px] flex flex-col justify-center items-center rounded-full border border-solid border-[rgba(255,255,255,0.12)] cursor-pointer"
                >
                  <img
                    src={social.icon}
                    alt={social.alt}
                    className='w-[15px] h-[15px]'
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="flex w-[720.17px] gap-[90px] justify-end h-fit max-md:w-full max-md:justify-start">
            <div className="w-[252px] h-[98px] max-md:w-full">
              <p className="w-[218px] h-[75px] font-[400] text-[16px] leading-[159%] align-middle max-md:w-full">
                {currentLan === 'ru' ? 'Ташкент, Мирабадский район, махаллинский сход граждан Тонг Юлдузи' : 'Tashkent, Mirabad district, Tong Yulduz community council'}
              
              </p>
            </div>
          </div>
        </div>

        <div className="w-[1296px] pt-[32px] border-t border-solid border-[rgba(255,255,255,0.12)] max-2xl:w-full">
          <p className="w-[426px] h-[28px] font-[400] text-[16px] align-middle text-[#6b6b6b] mr-auto ml-auto max-md:w-full max-md:text-center">
            Copyright 2024 Social Akfa Medline. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
