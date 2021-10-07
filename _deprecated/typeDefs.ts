import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  
  type Query {
    currentUser: User
  }

  type Region {
    id: ID!
    name: String
  }

  type Province {
    id: ID!
    name: String!
    
  }

  type Municipality {
    id: ID!
    name: String!
    location: Point
  }

  type Barangay {
    id: ID!
    name: String!
    shops: [Shop] @relationship(type: "HAS", direction: IN)
    communities: [Subdivision] @relationship(type: "HAS", direction: IN)
    postal_code: String
    location: Point
  }

  type Subdivision {
    id: ID!
    name: String!
    barangay: Barangay @relationship(type: "SUBDIVISION_IN", direction: OUT)
    shops: [Shop] @relationship(type: "HAS", direction: IN)
    location: Point
  }

  enum ListingCategory {
    Applicances
    Automotive
    Baby_Kids
    Bicycles
    Clothing
    Electronics
    Furniture
    Garage_Sales
    Garden
    Home_Decor
    Home_Sales
    In_Search_Of
    Musical_Instruments
    Neighbor_Made
    Neighbor_Services
    Other
    Pet_Supplies
    Property_Rentals
    Sports_Outdoors
    Tickets
    Tools
    Toys_Games
  }

  enum ListingAudience {
    Municipality
    Surrounding_Barangays
    Barangay
    Subdivision
  }

  type Image {
    src: String!
    alt: String
    width: Int
    height: Int
  }

  type Video {
    src: String!
    width: Int
    height: Int
  }

  type Listing {
    id: ID!
    user: User
      @relationship(type: "POSTED_BY", direction: OUT)
    created: DateTime
    images: [Image]
    videos: [Video]
    title: String!
    price: Int
    details: String!
    category: ListingCategory!
    audience: ListingAudience!
  }

  # interface Posted @relationshipProperties {
  #   post_type: PostType
  # }

  type GeneralPost {
    id: ID!
    user: User
      @relationship(type: "POSTED_BY", direction: OUT)
    subject: String!
    message: String!
    location: Point
    images: [Image]
    videos: [Video]
  }

  type User {
    id: ID!
    username: String!
    first_name: String!
    last_name: String!
    created: DateTime
    last_seen: DateTime
    avatar: String
    bio: String
    resident_since: Date
    invited_by: User @relationship(type: "INVITED_BY", direction: OUT)
    shops: [Shop] @relationship(type: "OWNED_BY", direction: OUT)
    comments: [Comment] @relationship(type: "COMMENTED_ON", direction: OUT)
  }

  type Comment {
    id: ID!
    user: User @relationship(type: "COMMENTED_BY", direction: IN)
    message: String!
    images: [Image]
    videos: [Video]
  }

  enum ShopType {
    TRADITIONAL
    GHOST
    SARISARI
    MOBILE
  }

  type Shop {
    id: ID!
    name: String!
    slug: String!
    created: DateTime
    owner: User @relationship(type: "OWNS", direction: IN)
    shop_type: ShopType
    delivery: Boolean
    barangay: Barangay @relationship(type: "LOCATED_IN", direction: OUT)
    Subdivision: Subdivision @relationship(type: "LOCATED_IN", direction: OUT)
    address1: String
    address2: String
    phone: String
  }
`;
