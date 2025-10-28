import Hero from "../sections/LandingPage/Hero/Hero"
import InvitationSection from "../sections/LandingPage/LandingInvitation/Invitation";
import JoinUsSection from "../sections/LandingPage/JoinUs/JoinUs";
import ClinicAdvantages from "../sections/LandingPage/ClinicAdvantages/ClinicAdvantages";
import ApplicationRequirements from "../sections/LandingPage/ApplicationRequirements/ApplicationRequirements";
import HiringDepartments from "../sections/LandingPage/HiringDepartments/HiringDepartments";
import FieldSearch from "../sections/LandingPage/FieldSearch/FieldSearch";
import Contacts from '../sections/LandingPage/Contacts/Contacts'

function LandingPage() {
  return (
    <>
      <Hero />
      <InvitationSection />
      <JoinUsSection />
      <ClinicAdvantages />
      <ApplicationRequirements />
      <HiringDepartments />
      <FieldSearch />
      <Contacts />
    </>
  );
}

export default LandingPage;
