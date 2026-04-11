# Cloud Gallery Backend

A Node.js/Express backend for the Cloud Image Gallery application. This service handles:
- User authentication (register, login, profile)
- Image management (upload, retrieve, delete)
- Azure Blob Storage integration

## 🚀 Deployment

This backend is deployed on **Render** as an independent service.

### Environment Variables (Required)

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_key
AZURE_STORAGE_CONNECTION_STRING=your_azure_connection_string
AZURE_CONTAINER_NAME=images
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
```

### Local Development

```bash
# Install dependencies
npm install

# Start development server with nodemon
npm run dev

# Server runs on http://localhost:5000
```

### Deployment on Render

1. Push this repository to GitHub
2. Go to [render.com](https://render.com)
3. Create a new Web Service
4. Connect this GitHub repository
5. Set environment variables in Render Dashboard
6. Deploy

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user (returns JWT token)
- `GET /api/auth/profile` - Get user profile (requires JWT token)

#### Images
- `GET /api/images` - Get all images
- `POST /api/images` - Upload image (requires JWT token)
- `DELETE /api/images/:id` - Delete image (requires JWT token)

### Project Structure

```
backend/
├── app.js              # Main application file
├── package.json        # Dependencies
├── Procfile           # Render deployment configuration
├── config/
│   ├── db.js          # MongoDB connection
│   └── azure.js       # Azure Storage setup
├── controllers/
│   ├── authController.js
│   └── imageController.js
├── middleware/
│   └── auth.js        # JWT authentication middleware
├── models/
│   ├── User.js
│   └── Image.js
└── routes/
    ├── auth.js
    └── images.js
```

### Important Notes

- This is an independent service - no dependencies on the frontend folder
- CORS is configured to accept requests from the frontend URL
- MongoDB connection must allow Render's IP addresses
- Azure Storage credentials are kept secure via environment variables
- JWT tokens are used for protected routes

---

See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for detailed Render deployment instructions.
