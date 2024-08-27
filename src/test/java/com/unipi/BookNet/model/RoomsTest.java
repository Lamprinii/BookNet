package com.unipi.BookNet.model;

import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class RoomsTest {
	@Test
	public void getId() {
		Rooms r = new Rooms("abc", 123);
		Long expected = 123L;
		Long actual = r.getId();

		assertEquals(expected, actual);
	}
}
