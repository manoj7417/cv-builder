export const RolesAndPermission = [
  {
    id: 1,
    role: "SuperAdmin",
    managePermissions:["managedBlogs","managedUser","settings","publishBlog"]
  },
  {
    id: 2,
    role: "Admin",
    managePermissions:["managedBlogs","managedUser","verifyBlog"]
  },
  {
    id: 3,
    role: "User",
    managePermissions:"managedBlogs"
  },
];

export const userDetails = [
    {
        userId:1,
        userName:"Mukesh",
        role:"SuperAdmin",
        managePermissions:["managedBlogs","managedUser","settings","publishBlog"]
    },
    {
        userId:2,
        userName:"Suresh",
        role:"Admin",
        managePermissions:["managedBlogs","managedUser","verifyBlog"]
    },
    {
        userId:3,
        userName:"Mahesh",
        role:"Admin",
        managePermissions:["managedBlogs","managedUser","verifyBlog"]
    },
    {
        userId:4,
        userName:"Rohit",
        role:"User",
        managePermissions:"managedBlogs"
    },
    {
        userId:5,
        userName:"Virat",
        role:"User",
        managePermissions:"managedBlogs"
    },
    {
        userId:6,
        userName:"Rahul",
        role:"User",
        managePermissions:"managedBlogs"
    }
]