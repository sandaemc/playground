package org.sandaemc

class Sample {
    fun shower() {
    }
}

class FilledRectangle: Rectangle() {
    fun draw() { println("FIlled rectangle draw") }
    val borderColor: String get() = "black"

    inner class Filler {
        fun fill() { /* ... */ }
        fun drawAndFill() {
            super@FilledRectangle.draw() // Calls Rectangle's implementation of draw()
            fill()
            println("Drawn a filled rectangle with color ${super@FilledRectangle.borderColor}") // Uses Rectangle's implementation of borderColor's get()
        }
    }
}

