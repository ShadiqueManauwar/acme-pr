
## Getting Started
### Prerequisites
- Node.js
- MongoDB
- Git

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-github-username/mern-dashboard-challenge.git
   cd mern-dashboard-challenge


### Setup Instructions:

**Client (Frontend - Vite React)**:
#### Libraries/Tech used:
- `react.js`
- `shadcn` for components
- `react-share` for sharing profile to social apps
- `tailwind css` for styling
- `lucide-react` for icons
- `js-cookies` for handling browser cookies storage
- `jsrsasign` for decoding jwt
- `sonner` for taost notifications
- `axios` for making api calls
- `moment` for datetime formatting
- `typescript` for type safety



### Setup process
--- 
- Ensure Node.js is installed.
- Navigate to the `client` folder:
  ```bash
      cd client
      pnpm install
      pnpm build
      pnpm start # or "pnpm dev" for dev server

-  Env variables for client app 
   ```bash
      VITE_SERVER_URL=http://localhost:8000 ## or whatever your port is
      VITE_JWT_SECRET=secret string should be same as backend JWT_SECRET


**Server (Backend - Express.js MongoDB  Prisma)**:

#### Libraries/Tech  used:
- `express.js`
- `prisma` for db orm
- `jsonwebtokens` for signing jwts for auth
- `zod` for validation api inputs
- `mongodb` for database
- `helmet` for proteting apis from comman attacks
- `morgan` for logging
- `dotenv` for envs
- `typescript` for type safety
- `webpack` for bundling 
- `cors` for protection from cross origin attacks
- `bcrypt` for encrypting anc hashing password

### Setup process
--- 
- Ensure Node.js is installed.
- Navigate to the `server` folder:
  ```bash
   cd server
   pnpm install
   pnpm generate
   pnpm build
   pnpm start # or "pnpm dev" for dev server

-  Env variables for server app 
   ```bash
      PORT=your port # (optional) default is 8000 
      VITE_SERVER_URL=http://localhost:8000 
      DATABASE_URL=mongodb url 
      JWT_SECRET=secret string should be same as    frontent VITE_JWT_SECRET
- The secret can be generated with 
   ```bash
      # Linux
      openssl rand -base64 32

      # windows and Mac
      best of luck 👍
      # jk ... visit this url => https://generate-secret.vercel.app/32
   
`I am using TS for this project which helped me to eleminate unneccessary commenting on code for params and return types.
I also "try" to name my variables and fucntions and in general write my code such that, fellow programmers are able to understand what the code is trying to do, and where I believed the code needed commenting I did comment that part.
`
