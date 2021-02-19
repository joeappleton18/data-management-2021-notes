module.exports = {
    base: "/data-management-2021-notes/",
    dest: "docs",
    themeConfig: {
        displayAllHeaders: true,
        sidebar: [
            {
                title: "Overview",
                collapsable: true,
                children: ["/"],
            },

            {
                title: "Week 1 - Introduction to NodeJS and MongoDB",
                collapsable: true,
                children: ["/sessions/week_1/"],
            },
            {
                title: "Week 2 - Exploring Node, Express and Templates",
                collapsable: true,
                children: ["/sessions/week_2/"],
            },
            {
                title: "Week 3 - MongoDB Queries",
                collapsable: true,
                children: ["/sessions/week_3/"],
            }
        ],
    },
};


/// 