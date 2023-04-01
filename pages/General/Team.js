// Imported components
import TeamMembers from "../../data/TeamMembers.js";
import TeamCard from "../../components/general/team/TeamCard";
import GeneralLayout from "../../components/general/GeneralLayout";
// Imported stylesheet
import classes from "../../styles/general/Team.module.css";



export default function Team() {
  return (
    <>
      <div className={classes.teamContainer}>
        <div className={classes.teamContent}>
          <h2>TEAM</h2>
          <div className={classes.teamGridContainer}>
            {TeamMembers.map((member, index) => (
              <TeamCard
                key={index}
                title={member.title}
                imageSrc={member.imageSrc}
                imageAlt={member.imageAlt}
                discordUsername={member.discordUsername}
                twitterUsername={member.twitterUsername}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};


Team.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
}