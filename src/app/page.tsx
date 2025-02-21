import AboutUs from "../components/Aboutus";
import { Landingpage } from "~/components/landingpage";
import JoinOurCommunity from "~/components/JoinOurCommunity";
import DomainsPage from "~/components/domainsPage";
import CustomCursor from "~/components/CursorAnimation";

export default function HomePage() {
  return (
    <body className="cursor-none "style={{ backgroundColor: "#1E003E" }}>
      <CustomCursor/>
      <div className="mb-32">
        <Landingpage />
      </div>
      <AboutUs />
      <DomainsPage />
      <JoinOurCommunity />
    </body>
  );
}
