plugins {
    java
    application
    kotlin("jvm") version "1.3.41"
    id("com.github.johnrengelman.shadow") version "5.1.0"
}

application {
    mainClassName = "org.sandaemc.LibraryKt"
}

repositories {
    jcenter()
}

dependencies {
    implementation(kotlin("stdlib"))
}
