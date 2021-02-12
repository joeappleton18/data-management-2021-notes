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
                title: "Week 2 - Exploring Node, Express and Templates",
                collapsable: true,
                children: ["/sessions/week_2/"],
            },
        ],
    },
};

