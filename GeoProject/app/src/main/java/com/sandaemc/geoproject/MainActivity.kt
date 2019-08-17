package com.sandaemc.geoproject

import android.app.IntentService
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Address
import android.location.Geocoder
import android.location.Location
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.os.ResultReceiver
import android.util.Log
import android.widget.TextView
import android.widget.Toast
import androidx.core.content.ContextCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import java.io.IOException
import java.util.*

object Constants {
    const val SUCCESS_RESULT = 0
    const val FAILURE_RESULT = 1
    const val PACKAGE_NAME = "com.sandaemc.geoproject"
    const val RECEIVER = "$PACKAGE_NAME.RECEIVER"
    const val RESULT_DATA_KEY = "${PACKAGE_NAME}.RESULT_DATA_KEY"
    const val LOCATION_DATA_EXTRA = "${PACKAGE_NAME}.LOCATION_DATA_EXTRA"
}

class FetchAddressIntentService : IntentService("FetchAddressIntentService") {
    private var receiver: ResultReceiver? = null

    override fun onHandleIntent(intent: Intent?) {
        intent ?: return

        val geocoder = Geocoder(this, Locale.getDefault())

        var location = intent.getParcelableExtra<Location>(Constants.LOCATION_DATA_EXTRA)
        receiver = intent.getParcelableExtra<ResultReceiver>(Constants.RECEIVER)

        var errorMessage = ""
        var addresses: List<Address> = emptyList()

        try {
            addresses = geocoder.getFromLocation(
                location.latitude,
                location.longitude,
                3
            )

        } catch (ioException: IOException) {
            Log.e("err", "service unavailable", ioException)
            errorMessage = "service unavailable"
        } catch (illegalArgumentException: IllegalArgumentException) {
            Log.e("err", "invalid lat used", illegalArgumentException)
            errorMessage = "invalid lat/long used"
        }

        if (addresses.isEmpty()) {
            if (errorMessage.isEmpty()) {
                errorMessage = "no address found"
                Log.e("err", "no address found")
            }

            deliverResultToReceiver(Constants.FAILURE_RESULT, errorMessage)
        } else {
            val addressString = addresses.map { it.countryName }.joinToString(separator = " ")
            Log.i("success", "Addresses found!: $addressString ")
            deliverResultToReceiver(Constants.SUCCESS_RESULT, addresses.mapNotNull { "${it.featureName} - ${it.locality} - ${it.thoroughfare}" }.joinToString(separator = " " ))
        }
    }


    private fun deliverResultToReceiver(resultCode: Int, message: String) {
        val bundle = Bundle().apply { putString(Constants.RESULT_DATA_KEY, message) }
        receiver?.send(resultCode, bundle)
    }

}

class MainActivity : AppCompatActivity() {
    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var resultReceiver: AddressResultReceiver

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)
        resultReceiver = AddressResultReceiver(Handler())

        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            val txtView = findViewById<TextView>(R.id.txt_hello)
            val locString = { location: Location? -> "Lat: ${location?.latitude}, Long: ${location?.longitude}" }

            fusedLocationClient.lastLocation.addOnSuccessListener { location: Location? ->
                if (location == null) {
                    showToast("No location")
                    return@addOnSuccessListener
                }

                if (!Geocoder.isPresent()) {
                    showToast("No geocoder available")
                    return@addOnSuccessListener
                }

                txtView.text = locString(location)

                startIntentService(location)
            }
        }
    }

    private fun startIntentService(location: Location) {
        val intent = Intent(this, FetchAddressIntentService::class.java).apply {
            putExtra(Constants.RECEIVER, resultReceiver)
            putExtra(Constants.LOCATION_DATA_EXTRA, location)
        }

        startService(intent)
    }


    fun showToast(message: String) = Toast.makeText(this, message, Toast.LENGTH_LONG).show()

    internal inner class AddressResultReceiver(handler: Handler): ResultReceiver(handler) {
        override fun onReceiveResult(resultCode: Int, resultData: Bundle?) {
            Log.i("here", "IN here")
            super.onReceiveResult(resultCode, resultData)

            val address = resultData?.getString(Constants.RESULT_DATA_KEY) ?: ""
            showToast("Address: $address")

            Log.i("received", address)

            if (resultCode == Constants.SUCCESS_RESULT) {
//                showToast("Address found")
            }
        }
    }


}
