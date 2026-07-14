###########################################################################
# IMPORT LIBRARIES
###########################################################################

# OSMnx
#
# Downloads geographic information directly from OpenStreetMap.
# It can download:
#
# • Roads
# • Buildings
# • Parks
# • Schools
# • Restaurants
# • Bus stops
# • Hospitals
#
# It also converts roads into a graph that NetworkX can analyze.
#
import osmnx as ox


# NetworkX
#
# A Python library for graph analysis.
#
# Remember:
#
#      Node ---- Edge ---- Node
#
# This library knows how to compute
#
# • shortest path
# • nearest node
# • reachable roads
# • connectivity
#
import networkx as nx


# GeoPandas
#
# Similar to Pandas...
#
# but every row contains geometry.
#
# Example
#
# Name            Geometry
# ------------------------------
# Park A          Polygon(...)
# Park B          Polygon(...)
#
#
import geopandas as gpd


# Folium
#
# Creates interactive Leaflet maps.
#
# The result is an HTML file that can be opened
# in every web browser.
#
import folium


# Point geometry
#
# Used for our starting location.
#
from shapely.geometry import Point


# Used to save files.
#
import os



###########################################################################
# PROJECT SETTINGS
###########################################################################

# The city that OSMnx will download.
#
# OSMnx sends this string to OpenStreetMap's
# Nominatim service, which returns the city's boundary.
#
CITY = "Kraków, Poland"


# Our starting point.
#
# Latitude and longitude are stored in WGS84
# (EPSG:4326).
#
# This location is Kraków's Main Square.
#
HOME_LAT = 50.0646501
HOME_LON = 19.9449799


# Maximum walking distance.
#
# IMPORTANT
#
# This is NOT a straight-line radius.
#
# Later NetworkX will interpret this as
#
# "maximum distance traveled along roads."
#
WALK_DISTANCE = 800

###########################################################################
# DOWNLOAD WALKABLE STREETS
###########################################################################

print("=" * 60)
print("DOWNLOADING WALKING NETWORK")
print("=" * 60)

# graph_from_place()
#
# This is probably the most important OSMnx function.
#
# It performs several operations:
#
# 1. Finds Kraków.
#
# 2. Downloads its administrative boundary.
#
# 3. Queries OpenStreetMap.
#
# 4. Downloads every road that can be walked.
#
# 5. Builds a NetworkX graph.
#
# We specify:
#
# network_type="walk"
#
# which removes:
#
# × Motorways
# × Private roads
# × Roads where pedestrians are forbidden
#
# and keeps:
#
# ✓ Footpaths
# ✓ Sidewalks
# ✓ Residential streets
# ✓ Crossings
#
G = ox.graph_from_place(

    CITY,

    network_type="walk"

)

print()
print("Download complete!")


###########################################################################
# INSPECT THE GRAPH
###########################################################################

print()
print("=" * 60)
print("GRAPH INFORMATION")
print("=" * 60)

print(f"Nodes : {len(G.nodes)}")
print(f"Edges : {len(G.edges)}")

###########################################################################
# WHAT DOES A NODE LOOK LIKE?
###########################################################################

example_node = list(G.nodes)[0]

print()
print("Example node")

print(example_node)

print()

print(G.nodes[example_node])

###########################################################################
# WHAT DOES A ROAD LOOK LIKE?
###########################################################################

example_edge = list(G.edges(data=True))[0]

print()
print(example_edge)

###########################################################################
# FIND THE STARTING POINT IN THE STREET NETWORK
###########################################################################

# At the moment, our starting location is just a pair of coordinates:
#
# Latitude:
# 50.0646501
#
# Longitude:
# 19.9449799
#
# A human understands this as:
#
# "This is the Main Square in Kraków."
#
# But the graph does not understand locations this way.
#
# The graph only understands:
#
# Nodes and edges.
#
# Example:
#
#          Node A
#             ○
#            / \
#           /   \
#          ○-----○
#        Node B  Node C
#
# Every intersection in the street network has a unique ID.
#
# Therefore, before we can do any routing analysis, we need to find:
#
# "Which node in the street network is closest to my location?"
#
# This process is called "snapping" a point to the network.
#
###########################################################################

home_node = ox.distance.nearest_nodes(
    
    G,              # The walking graph we downloaded from OpenStreetMap
    
    X=HOME_LON,     # Longitude of our starting point
    
    Y=HOME_LAT      # Latitude of our starting point
)


# This prints the ID of the closest street node.
#
# Example:
#
# 532817481
#
# This number has no meaning by itself.
# It is simply the identifier of an intersection in Kraków's road network.
#
print("Starting node:", home_node)



###########################################################################
# CREATE A WALKABLE AREA USING THE STREET NETWORK
###########################################################################

# Now we ask a much more interesting question:
#
# "Starting from this node, what streets can I reach within 800 meters?"
#
# This is different from creating a circle buffer.
#
#
# A normal buffer:
#
#
#          _______
#       /           \
#      |     🏠      |
#       \___________/
#
#
# assumes you can walk everywhere.
#
# A network analysis follows actual streets:
#
#
#          |
#     -----○-----
#          |
#        🏠
#          |
#     -----○-----
#
#
# It respects:
#
# ✓ Rivers
# ✓ Highways
# ✓ Missing crossings
# ✓ Street layout
#
#
# nx.ego_graph() means:
#
# "Give me everything connected to this starting point
# within a certain distance."
#
###########################################################################

subgraph = nx.ego_graph(

    G,                  # The full Kraków walking network

    home_node,          # Where the walking starts

    radius=WALK_DISTANCE,

    distance="length"   # IMPORTANT:
                        #
                        # Use the real length of streets.
                        #
                        # Example:
                        #
                        # Street A = 50 meters
                        # Street B = 200 meters
                        #
                        # The algorithm adds these values.
                        #
                        # It does NOT measure straight-line distance.
)


###########################################################################
# CHECK THE RESULT
###########################################################################

# The original graph contains all of Kraków.
#
# The subgraph contains only the reachable part.
#
# Now we can compare:
#
# Before:
#
# Entire Kraków
#
# After:
#
# 800 meter walking area
#
###########################################################################

print(
    "Reachable nodes:",
    len(subgraph.nodes)
)


print(
    "Reachable streets:",
    len(subgraph.edges)
)



###########################################################################
# QUICK VISUAL CHECK
###########################################################################

# This creates a simple plot using OSMnx.
#
# We are NOT making our final beautiful map yet.
#
# This is just a debugging visualization.
#
# We want to answer:
#
# "Did the algorithm actually find the correct streets?"
#
###########################################################################

fig, ax = ox.plot_graph(

    subgraph,

    # Hide the intersection points.
    #
    # Otherwise we would see thousands of dots.
    node_size=0,


    # Color of reachable streets.
    #
    # Blue means:
    #
    # "These streets are accessible."
    #
    edge_color="#0077cc",


    # Thickness of street lines.
    #
    edge_linewidth=2,


    # Background color.
    #
    # White makes the network easier to see.
    #
    bgcolor="white"
)



###########################################################################
# CONVERT BACK TO GEOPANDAS
###########################################################################

# Up until now we have been working with a NetworkX graph.
#
# NetworkX is excellent for:
#
# ✓ Routing
# ✓ Shortest paths
# ✓ Network analysis
#
# But GeoPandas is better for:
#
# ✓ Maps
# ✓ Spatial joins
# ✓ Intersections
# ✓ Buffers
#
#
# Therefore we convert the graph back into GeoDataFrames.
#
###########################################################################

nodes, edges = ox.graph_to_gdfs(subgraph)



###########################################################################
# WHAT DID WE CREATE?
###########################################################################

# nodes:
#
# A GeoDataFrame containing street intersections.
#
# Example:
#
# Node ID       Geometry
# ----------------------------
# 12345         POINT(...)
#
#
#
# edges:
#
# A GeoDataFrame containing street segments.
#
# Example:
#
# Street        Length       Geometry
# ------------------------------------
# Road A        80m          LINESTRING(...)
#
#
# The edges GeoDataFrame is what we will use next
# to create our isochrone polygon.
#
###########################################################################
