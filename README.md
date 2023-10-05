# STRAPI REMIX STARTER: REMIX V2, STRAPI, TYPESCRIPT and TAILWIND.

note: This project was started with love by [Paul](https://github.com/PaulBratslavsky) and design is by [Trecia](https://github.com/TreciaKS).

I love Remix and I am new to Typescript. If you find any bugs or improvements feel free to create an issue. Thank you all for your support and participation.

<-- insert gif of project in action>

## Getting Started

1. Clone the repository locally:

```bash
  git clone https://github.com/PaulBratslavsky/strapi-remix-starter.git
    or
  gh repo clone PaulBratslavsky/strapi-remix-starter
```

2. Run `setup` command to setup frontend and backend dependencies:

```bash
  yarn setup
```

3. Next, navigate to your `/backend` directory and set up your `.env` file. You can use the `.env.example` file as reference:

```bash
HOST=localhost
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
```

4. Start your project by running the following command:

```bash
  yarn build
  yarn develop
```

You will be prompted to create your first admin user.

![admin-user](https://user-images.githubusercontent.com/6153188/231865420-5f03a90f-b893-4057-9634-9632920a7d97.gif)

Great. You now have your project running. Let's add some data.

## Seeding The Data

We are going to use our DEITS feature which will alow to easily import data into your project.

You can learn more about it in our documentation [here](https://docs.strapi.io/dev-docs/data-management).

In the root of our project we have our `seed-data.tar.gz` file. We will use it to seed our data.

1. Open up your terminal and make sure you are still in you `backend` folder.

2. Run the following command to seed your data:

```bash
  yarn strapi import -f ../seed-data.tar.gz
```

![after-import](https://user-images.githubusercontent.com/6153188/231865491-05cb5818-a0d0-49ce-807e-a879f7e3070c.gif)

This will import your data locally. Log back into your admin panel to see the newly imported data.

Here is a quick video covering initial setup and data seeding.

