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
        ],
    },
};