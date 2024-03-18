import AboutUs from "../components/Aboutus";
import { Landingpage } from "~/components/landingpage";
import JoinOurCommunity from "~/components/JoinOurCommunity";
import DomainsPage from "~/components/domainsPage";

export default function HomePage() {
  return (
    <body style={{ backgroundColor: "#1E003E" }}>
      <Landingpage />
      <AboutUs />
      <DomainsPage />
      <JoinOurCommunity />
    </body>
  );
}
