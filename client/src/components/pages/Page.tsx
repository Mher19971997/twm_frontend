import styles from "./../../components/groups/Groups.module.scss";

interface GroupItem {
  pagesItem: string[];
  onClick: (name: string, type: "user" | "group" | "page") => void;
}

export default function Pages({ pagesItem, onClick }: GroupItem) {
  interface PagesProps {
    groupText: string;
    userName: string;
    className: string;
    icon: JSX.Element;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase()) 
      .join("");
  };
  const pages: PagesProps[] = pagesItem.map((pageName, index) => {
    return {
      groupText: getInitials(pageName), 
      userName: pageName, 
      className: `${styles.group} ${styles[`group${index + 1}`]}`,
      icon: <div className={styles.iconOnline}></div>, 
    };
  });

  return (
    <div className={styles.groups}>
      <h2>Pages</h2>
      <div className={styles.users}>
        {pages.map((pageItem, index) => (
          <div
            key={index}
            className={pageItem.className}
            onClick={() => onClick(pageItem.userName, "page")}
          >
            <div className={styles.contact}>
              <div className={styles.userAndName}>
                <div className={styles.groupAvatar}>
                  <p>{pageItem.groupText}</p>
                </div>
                <h4>{pageItem.userName}</h4>
              </div>
              {pageItem.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
