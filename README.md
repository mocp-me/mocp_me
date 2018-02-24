# MoCP.me

###Application for Museum of Contemporary Photography that reverse image searches the museums database and allows the public to interact with the museums works on user-generated terms.

![alt text](/readme_ref/mocp_data_flow.jpg?raw=true "The App") 

### The Tagging Project
In 1980, the Museum of Contemporary Photography established a permanent collection and it is through this collection that the museum has been able to provide an invaluable research and educational resource to the general public and thousands of students. In 2009, the growing collection was digitized and made available online for free to the general public. To extend the reach of the Museum of Contemporary Photography’s vast resources from the collection and enhance connections between the institution and the community, artist Jan Tichy has developed a project and exhibition utilizing the museum’s collection of over 12,000 photographs.

<b>MoCP.me</b> was created by developers, Amanda Yamasaki, Lane Anderson, Michael Doherty, and Dennis Hodges.  The goal of <b>MoCP.me</b> is to utilize relevant technologies like machine learning and computer vision to futher engage the public with the collection on user-generated terms.

---

# How It Works
### Add Image
Users can upload a photograph that will be analyzed by Google Vision to return relevant tags. These tags will then be used to query our database of photographs from the MoCP collection, returning a complimentary collection photograph to the user uploaded photograph.  <b>The user can then decide to submit the pairing to the collection where the pairings will be exhibited.</b>

### Search
Users can search for tags to view images tagged similarly by either other users or Google Vision. 

### Tag Submit
Users can submit tags for their returned MoCP collection photograph, or while searching for other tags.  

---

![alt text](/readme_ref/mocp_me_visual.jpg?raw=true "The App") 

---

# Database Creation
### Raw Data Prep
Due to the unique nature of this project, the database of images and information that we had access to was greatly limited. We were unable to plug directly in the database that the museum uses for their internal systems. Instead we received a hard drive copy of the files and folders of each image and high definition image. This hard drive contained a seemingly unordered structure of nested folders and database files.

In order to get a database that we could use we first had to sift through the hard drive and pull out all the file paths of all the images. Using *fs* the file-system package for node, we iterated over each folder in the hard drive in and wrote a mySql query to log each folder path.

Then we removed all folders that that were not used to contain images and didn't get picked up by out filters. 

Next we take our new table of folder paths and used the *fs* package again to create a table of all image file paths nested in the hard drive.

The resulting table can then by used to do a mass copy of all the images into a new folder which now contained approximately 22,000 images.

### Publicly Accessible Images
Now that we have a folder of our images, we needed someplace to store them. We used the *fs* package again to iterate over each one in an application and copy them to a remote storage bucket on Google Cloud Platform using the Cloud Shell terminal. Once the images were there we simply had to use the shell commands to assign each image a public url. This url had the same base with different image names. A public url was added to our images table in our database so that we can query and display the images in the MoCP collection.

### How to Search the Images
With a table of images with public url's we now needed a way to 'tag' the images to show what they are. We used Google's Cloud Vision api to send an image to the api and in response we would get a list of 8-10 words that describe each image. Using a node program coupled with the table of images we were able to iterate over each of the 22,000 images and add the api's response to a new table, 'Tags'. The Tags table is a relational table that has a unique id, the tag name, and a photo_id column that relates to the id of the image. This allows us to query all 'cat' tagged images for example and display them to the user.

### Adding Information and Refinement
After we presented our first rendering of this application to the museum we were finally presented with a csv file of all the photo information. We took this file and imported it a table in mySql. There were fewer images in the file from the museum than we had in our table so we had to sift through the unused images and remove them from the final usable table. We then joined the information to each image based on the file name and were left with a refined table of 12,000 images that included; artist name, artwork name, year, medium used, and the assension number for categorization at the museum. With our new list of photos we refined the tags table by removing all tags that had a photo_id that was no longer found in the photos table.

### User Added Tags
The entire premise of this application was to first get people to interact with the museums collection in a creative and fun way, and second to get the public to add their own #hashtags to the collection. We didn't want to litter the table filled with Google Vision tags so we opted to create a new table where users own tags will be stored with a reference to the photo_id as well as sitting in a cue, waiting to be approved. This gives the museum admins the capability to log in to the admin portal and review user added tags and approve, unapprove, edit, or delete them. Our goal is to use the approved user tags along with the base tags table to query the images together. This will allow the application to 'learn' over time and get better and better at improving searchability through the collection.


# Database Table Examples

### Photos Table
| id    | name      | path          | web_path              | artist_id | artist    | title         | year      | medium        | dimensions        | accession_num     | file_name         |
| ----- | --------- | ------------- | --------------------- | --------- | --------- | ------------- | --------- | ------------- | ----------------- | ----------------- | ----------------- |
| 10    | 1997_1_11 copy.jpg | /Volumes/MOCP_AI/Abbott_B/1997_1_11 copy.jpg | https://storage.googleapis.com/mocp_images/MOCP_IMAGES/1997_1_11 copy.jpg | 33 | Abbott, Berenice | Collision of Two Balls, from The Science Pictures portfolio | 1958-1961; printed 1982 | Gelatin silver print | board: 30 in x 24 in; image/paper: 18 5/8 in x 15 1/2 in; paper: 18 5/8 in x 15 7/16 in | 1997:1.11 | 1997_1_11 copy.jpg |

### Tags Table
| id    | tag_name          | photo_id  |
| ----- | ----------------- | --------- |
| 86    | Black             | 10        |
| 87    | Water             | 10        |
| 88    | Light             | 10        |

### user_tags Table
| id    | tag_name          | photo_id  | createdAt             | updatedAt             | approved  |
| ----- | ----------------- | --------- | --------------------- | --------------------- | --------- |
| 34    | Motion            | 10        | 2018-02-18 15:14:03   | 2018-02-18 16:47:83   | 1         |
| 97    | Swing             | 10        | 2018-02-20 14:25:33   | 2018-02-20 14:25:33   | 0         |


# API Reference

### Public Routes
### 

### Admin Routes