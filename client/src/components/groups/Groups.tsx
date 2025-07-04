import styles from "./Groups.module.scss";

interface GroupItem {
  groups: string[]; 
  onClick: (name: string, type: "group") => void; 
}

interface GroupsProps {
  groupText: string;
  userName: string;
  className: string;
  icon: JSX.Element;
}

export default function Groups({ groups, onClick }: GroupItem) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase()) 
      .join("");
  };

  const groupsList: GroupsProps[] = groups.map((groupName: any, index: number) => {
    return {
      groupText: getInitials(groupName),
      userName: groupName,
      className: `${styles.group} ${styles[`group${index + 1}`]}`,
      icon: <div className={styles.iconOnline}></div>, 
    };
  });

  return (
    <div className={styles.groups}>
      <h2>GROUPS</h2>
      <div className={styles.users}>
        {groupsList.map((groupItem: any, index: number) => (
          <div
            key={index}
            className={groupItem.className}
            onClick={() => onClick(groupItem.userName, "group")}
          >
            <div className={styles.contact}>
              <div className={styles.userAndName}>
                <div className={styles.groupAvatar}>
                  <p>{groupItem.groupText}</p>
                </div>
                <h4>{groupItem.userName}</h4>
              </div>
              {groupItem.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
