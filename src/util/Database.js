/**
 * The Supabase DB client
 */
import { createClient } from "@supabase/supabase-js";
import {
	SUPABASE_URL,
	SUPABASE_ANON_KEY,
	SUPABASE_WAITLIST_SIGNUPS_TABLE_NAME,
} from "../util/Constants";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

var cachedSignupCount = null;

export async function addToWaitlist(email) {
	if (!email) {
		throw new Error("Email is required");
	}

	const { data, error } = await supabase
		.from(SUPABASE_WAITLIST_SIGNUPS_TABLE_NAME)
		.insert([{ email }]);

	if (error) {
		console.error("Error adding to waitlist:", error);
		throw error;
	}

	return data;
}

export async function getSignupCount(courseId = SUPABASE_WAITLIST_SIGNUPS_TABLE_NAME) {
	if (cachedSignupCount != null) {
		console.log("Returning cached signup count");
		return cachedSignupCount;
	}
	const { data, error } = await supabase
		.from("waitlist_signup_count")
		.select("signup_count")
		.eq("course_id", courseId)
		.single();

	if (error) {
		console.error("Error fetching signup count:", error);
		return null;
	}

	cachedSignupCount = data.signup_count;

	return cachedSignupCount;
}
