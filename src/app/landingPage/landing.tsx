import "./landing.css";
import Image from "next/image";
import glog from "./glog.png"
import cake from "./cake.jpg"

export const LandingPage = () => {
  return <>
  <section></section>
  <h1 className="titleB">Cukiernia</h1>
  <h2>Witamy w cukierni Glognut</h2>
  <div className="info"><p>Nasza cukiernia to jest chyba wogule najlepsza na świecie i ten, wygraliśmy 13 nagród miesięcznych w roku 2025 a styczeń sie jeszcze nie skonczył nawet.</p><Image src={cake} width={400} height={200} alt="the cake is lying"/></div>
  <div className="info"><Image src={glog} width={400} height={200} alt="glog_massacre_2028_neverforget"/><p>Prosze zalogować się i kupić spróbować naszego przysmaku znanego na świecie (im tweaking). Tak wogule to nasze ceny są lepsze niż w lidlu na przykład</p></div>
  </>;
};
