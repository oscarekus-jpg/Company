import requests #do zaciagania danych z internetu
import geopandas as gpd
import osmnx as ox # do pobierania OSM
from shapely.geometry import Point
import folium #do interaktywnej mapki
import matplotlib.pyplot as plt # do mapki
import os #do zapisywania plikow

Granica_miasta = "Kraków, Poland" 

#everything in OSM is mapped using key value pairs. For example a public park is tagged with "leisure" and the value "park"

#Creating a dictionary
tags = {"leisure": "park"}

parks_gdf =ox.features_from_place(Granica_miasta, tags=tags)

#checking if the dataframe was created correctly
print(parks_gdf)

print(list(parks_gdf.columns)) 
print(parks_gdf.geom_type.value_counts())

#we need to filter out so we only have polygons and multipolygons...
is_in_parks = parks_gdf.geometry.geom_type.isin(['Polygon', 'MultiPolygon']) #this creates a boolean series that is True for rows where the geometry type is either Polygon or MultiPolygon

#create a new database where only the true values (polygons, multipolygons are kept)
park_polygons = parks_gdf[is_in_parks]
# we can use 'shape' to check out the data before and after the filtering
print("original data:", parks_gdf.shape[0]) #adding [0] here makes it so we fetch only the number of rows, if it were [1] it would be number of columns.... if just ".shape" then both
print("Filtered data:", park_polygons.shape[0])

#working with coordinates and projections
print("current CRS:", park_polygons.crs) 
#changing CRS is made by "to.crs" 
park_polygon_meters = park_polygons.to_crs(epsg=2180)

print(park_polygon_meters.geometry.head())

Test_location = Point(19.9449799, 50.0646501) #this is the location of the main square in Krakow
#putting this point into a temporary gdf (geodataframe)
home_gdf = gpd.GeoDataFrame(geometry=[Test_location], crs="EPSG:4326") #this is the CRS for lat/lon coordinates)
home_gdf = home_gdf.to_crs(epsg=2180) #changing the CRS to the same as the park polygons

#Creating the 800m buffer around the point
walking_buffer = home_gdf.buffer(800) #this creates a buffer of 800 meters around the point
#checking the buffer polygon
print(walking_buffer.area[0]) #putting [0] tells python to fetch only the number... without the names indexes and other ussless shit

#Checking the data through the map :)
map_check = park_polygons.explore(color="green", name = "Parks")
#adding layers:
walking_buffer.explore(m=map_check, color="blue", name = "Walking buffer")

local_path =os.path.join(".","TEST", "test_parks_buffer_map.html")

map_check.save(local_path)
