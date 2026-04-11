# Backend Deployment Guide - Render

## Deployment Steps

### 1. **Prepare Your Backend Repository**
- Ensure all code is pushed to your GitHub repository
- The `.env` file is in `.gitignore` (✅ already configured)
- Procfile is created (✅ already created)

### 2. **Create a Render Account**
- Go to [render.com](https://render.com)
- Sign up and connect your GitHub account

### 3. **Deploy Backend Service**

1. Click "New +" → "Web Service"
2. Connect your backend GitHub repository
3. Fill in the configuration:
   - **Name**: `cloud-image-gallery-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js` (Render will detect Procfile)

4. **Add Environment Variables** (in Render Dashboard):
   ```
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   AZURE_STORAGE_CONNECTION_STRING=<your_azure_storage_connection_string>
   AZURE_CONTAINER_NAME=images
   FRONTEND_URL=https://<your-vercel-frontend-url>.vercel.app
   ```

5. Deploy!

### 4. **After Deployment**
- Copy your Render URL (e.g., `https://cloud-image-gallery-backend.render.com`)
- Use this URL in your frontend's `REACT_APP_API_URL` environment variable

## Important Notes

- Render may have cold start times for free tier
- For production, consider upgrading to a paid plan
- Database connections must support Render's IP addresses
- CORS is configured to accept requests from your Vercel frontend URL

---

## Environment Variables Needed

Copy from `.env` and set them in Render:

- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `AZURE_STORAGE_CONNECTION_STRING`: Your Azure storage account connection string
- `AZURE_CONTAINER_NAME`: Container name (default: `images`)
- `FRONTEND_URL`: Your Vercel frontend URL (for CORS)
