# Agriculture News MiniApp

> A specialized news application designed to deliver agricultural updates to farmers, supported by a robust CMS for content administration. Fully deployed within the Zalo Mini App ecosystem ([Read more](https://miniapp.zaloplatforms.com/documents/intro/what-is-miniapp/)).

---

## Project Components

| Component | Technology | Description | Source Code |
| :--- | :--- | :--- | :--- |
| **User App** | React / Zalo SDK | The client-facing mobile interface for end-users. | [View Repo](https://github.com/adung1211/zmp-fe) |
| **Backend** | Node.js | Server-side logic, API endpoints, and database management. | [View Repo](https://github.com/adung1211/attminiapp-be) |
| **Admin CMS** | Next.js / Payload CMS | Administrative dashboard for content operations. | [View Repo](https://github.com/adung1211/zmp-cms) |

---

## Key Features

* **Zalo Integration:** Seamless integration with Zalo user accounts requiring no additional installation. Includes comprehensive news reading features and interactive user engagement capabilities.

https://github.com/user-attachments/assets/c2c6d24e-5408-4217-b78b-05f26be17a00

* **Media Management:** A web-based CMS dashboard featuring granular Role-Based Access Control (RBAC) for administrators and editors.

<div align="center">
    <img src="https://i.ibb.co/9m3MgJm0/image.png" border="1" width="600">  <br/>
  <b>Upload Flow:</b> <i>Create and publish news content to the app</i>
</div>
<br/>
<br/>
<div align="center">
    <img src="https://i.ibb.co/SwHD2wZg/image.png" border="1" width="600">  <br/>
  <b>Post Management:</b> <i>Manage and oversee created posts</i>
</div>
<br/>
<br/>
<div align="center">
    <img src="https://i.ibb.co/Y4zDCmXh/image-1.png" border="1" width="600">  <br/>
  <b>Text Editor:</b> <i>Rich text editor with fully integrated formatting features</i>
</div>
<br/>

* **Streamlined Publishing Workflow:** An intuitive process for uploading, editing, and managing agricultural content.

## Getting Started

### 1. Configuration & Environment Variables
```ini
# Create a .env file in the root directory
APP_ID=                  # Your Zalo Mini App ID
ZMP_TOKEN=               # Zalo Access Token
VITE_API_URL=            # Backend API URL
VITE_OPENWEATHER_API_KEY=# OpenWeather API Key
```
### 2. Installation & Deployment
```py
npm install   # Install dependencies
zmp deploy    # Deploy to the Zalo Mini App system
```
## Other Docs
* [Zalo Mini App Plaform](https://miniapp.zaloplatforms.com/documents/intro/getting-started/)
* [Payload CMS](https://payloadcms.com/docs/getting-started/what-is-payload)
